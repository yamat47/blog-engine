---
title: 'くらそうねに実在した不安定なRSpecのテストとその倒し方'
date: '2021/05/20 0:00:00'
author: 'takuya_yamaguchi'
thumbnail: 'real-unstable-specs.jpg'
---
こんにちは、バックエンドエンジニアの山口拓弥（[@yamat47](https://twitter.com/yamat47)）です。
夏にある友人の結婚式に向けて、最近ダイエットに勤しんでいます。
消費するカロリーよりも摂取するカロリーを少なくすればいいだけなんですが、それが難しいんですよね...。

さて、[くらそうね](https://www.crassone.jp)は一部を除いてほとんどがRuby on Railsで作られています。
自動テストのフレームワークはRSpecを採用しており、アプリのコードが増えるに従ってテストも段々と増えてきました。

そんなRSpecですが、書き方を誤ると途端に **実行結果が不安定なテスト** が爆誕します。
この記事では、くらそうねにかつて存在したそんな不安定なテストとその解決方法をいくつかご紹介します！

（サンプルコードは適宜一般的なテーマに変えています。）

## そもそも「不安定なテスト」って？
この記事で扱う不安定なテストは、具体的には以下のようなものを指しています。

* 実行するたびに成功したり失敗したりするテスト
* 実行する日付や時間帯によって成功したり失敗したりするテスト
* ローカル開発環境では成功するがCI環境では失敗するテスト

また不安定なテストというトピックはRSpecに限らず他のフレームワークでも起きうる一般的な話題です。
今回はRSpecをサンプルコードとして利用しますが、普段RSpecを書かない人でも雰囲気くらいは読み取っていただけると嬉しいです！

## 事例１：毎週日曜日と祝日に実行すると落ちるテスト
例えば`Appointment`という面談を表すクラスがあったとします。
このクラスは`#scheduled_date`という属性を持ち、そこには日曜日と祝日を登録できないという制約がかかっているとします。

```ruby
class Appointment < ApplicationRecord
  validate :scheduled_date_must_be_business_day, if: :scheduled_date

  class << self
    def holiday?(date)
      # 祝日かどうかの判定にはHolidayJpというライブラリを使っています。
      # https://github.com/holiday-jp/holiday_jp-ruby
      date.sunday? || HolidayJp.holiday?(date)
    end
  end

  private
    def scheduled_date_must_be_business_day
      errors.add(:scheduled_date, :not_business_day) if Appointment.holiday?(scheduled_date)
    end
end
```

そして、祝日かどうかを判定している`Appointment.holiday?`についてテストを追加しました。

```ruby
RSpec.describe Appointment do
  describe '.holiday?' do
    let(:date) { Date.current }

    subject { described_class.holiday?(date) }

    it { is_expected.to be false }
  end
end
```

最初に追加したテストはこんな感じだったのですが、これが不安定なテストになってしまっていました。
原因は明らかで、テスト対象にする日付の条件設定が甘かったためです。
というか、今思えばよくこんなテスト書いてしまっていましたね...。

常に「今日」が条件になっており、そもそもテストする条件と期待する結果が曖昧になってしまっていました。
その辺りも加味しつつこんな感じに修正をしました。

```ruby
RSpec.describe Appointment do
  describe '.holiday?' do
    let(:non_holiday_monday) { Date.current.beginning_of_week }
    let(:non_holiday_sunday) { Date.current.end_of_week }

    # 来年の今日までに月曜日の祝日があることを前提にしている。
    let(:holiday_monday) { HolidayJp.between(Date.current, Date.current.next_year).filter(&:monday?).first.date }

    before do
      # テストをさらに安定化するためにHolidayJp.holiday?の判定をスタブする。
      allow(HolidayJp).to receive(:holiday?).with(non_holiday_monday).and_return(false)
      allow(HolidayJp).to receive(:holiday?).with(non_holiday_sunday).and_return(false)
    end

    context '平日を渡したとき' do
      subject { described_class.holiday?(non_holiday_monday) }
      it { is_expected.to be false }
    end

    context '日曜日を渡したとき' do
      subject { described_class.holiday?(non_holiday_sunday) }
      it { is_expected.to be true }
    end

    context '祝日を渡したとき' do
      subject { described_class.holiday?(holiday_monday) }
      it { is_expected.to be true }
    end
  end
end
```

安定化するにあたって「2021年5月19日」のような特定の日付を使ってテストをする案もありました。
しかしこれだとテストだけをみたときに余計な情報が含まれるため、テストしたい条件がわかりづらくなると思い避けました。

実際はもう少し判定条件が複雑だったりテストする対象が色々な情報を持っていたりしたのですが、核となる部分を抜き出したらこうなりました。
日付の指定は丁寧にする必要がありますね、反省です...！

## 事例２：MySQLの機嫌が悪いときに実行すると落ちるテスト
引き続き、事例１で扱った`Appointment`について考えていきます。
「最近設定された面談」を取得するなど`Appointment#created_at`で並べ替えることが増えてきたため、Modelにスコープを追加することにしました。

```ruby
class Appointment < ApplicationRecord
  # created_atの降順に並べ替えるスコープ。
  scope :order_by_created_at, -> { order(created_at: :desc) }
end
```

そして、この追加した`.order_by_created_at`についてテストを追加しました。

```ruby
RSpec.describe Appointment do
  describe '.order_by_created_at' do
    let!(:first_appointment) { Appointment.create }
    let!(:second_appointment) { Appointment.create }
    let!(:third_appointment) { Appointment.create }

    subject { Appointment.order_by_created_at }

    it { is_expected.to eq [third_appointment, second_appointment, first_appointment] }
  end
end
```

しかしこれは残念ながら不安定なテストになってしまっています...。

自動テストは基本的にはかなり高速に実行されます。
そのため、複数のレコードを順番に作っていったときに、作成日時が全く一致してしまうことがたびたびあります。
特にRailsの古いバージョンから継続して開発されているアプリの場合、データベースに保存されている時刻が秒の単位までしか保存されていないため、作成日時が全く同じレコードが複数登録されることはそこそこ頻繁に起きてしまいます。

（補足：最近のRailsではデフォルトでマイクロ秒まで保存されるようになっているため、あまりこの問題は起きないかもしれません。）

そして、同じ時刻で登録されているレコードたちを時刻の順に並べ替えるときに **どんな順番でデータが取り出されるかは完全に不定です。**
実行環境が異なれば違う結果になることもままあるため「ローカル開発環境では成功するテストがCIでは失敗する」といったことが起き得ます。

というわけで明示的に作成日時を与えてデータを準備するようにテストを修正しました。

```ruby
RSpec.describe Appointment do
  describe '.order_by_created_at' do
    let!(:first_appointment) { Appointment.create(created_at: Time.current) }
    let!(:second_appointment) { Appointment.create(created_at: Time.current - 1.hour) }
    let!(:third_appointment) { Appointment.create(created_at: Time.current + 1.hour) }

    subject { Appointment.order_by_created_at }

    it { is_expected.to eq [third_appointment, first_appointment, second_appointment] }
  end
end
```

利用しているデータベースクライアントやそのバージョンによっては、引き続きこのようなケースに遭遇するかもしれません。
何をテストしたいかを明確にするためにも、必要な条件は明示的に指定するのがよいと考えています。

## おわりに
今回はユニットテストを作るときに起こしてしまった不安定なテストについてお伝えしました。
くらそうねではCapybaraを利用したシステムテストも書いていますが、こちらも不安定なテストがまだまだゴロゴロ転がっています...。
こちらも鋭意修正中なので、また落ち着いたらCapybaraと仲良くする方法をこちらのブログでお伝えできたら嬉しいです！

クラッソーネではCIの結果がGreenに保ち続けたいエンジニアを大募集しています。
ご興味を持ってくださいましたら、ぜひ一度カジュアル面談でCIやRSpecについて語り合いましょう！

https://recruit.jobcan.jp/crassone/list?category_id=15694
