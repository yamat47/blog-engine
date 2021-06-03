---
title: '自作のRailsプラグインで君だけのRailsを作ろう！'
date: '2021/03/31 0:00:00'
author: 'takuya_yamaguchi'
thumbnail: 'build-your-own-rails-with-rails-plugin.jpg'
---

こんにちは、バックエンドエンジニアの山口拓弥（[@yamat47](https://twitter.com/yamat47)）です。

普段はRailsを書いていることがほとんどなので、こちらのブログでもRailsの話題を中心に発信をしていきます。
よろしくお願いします！

## 結構かゆいところに手が届くRails
Ruby on Railsはいわゆるフルスタックなアプリケーションフレームワークです。
[Active Record](https://railsguides.jp/active_record_basics.html) や [Action Controller](https://railsguides.jp/action_controller_overview.html) をはじめとする、色々なレイヤーの様々な機能を標準で提供しています。

最近では特定の用途に限定したコア機能も増えてきました。
受信メールを扱いやすくする [Action Mailbox](https://railsguides.jp/action_mailbox_basics.html)、リッチテキスト形式のデータを扱いやすくする [Action Text](https://railsguides.jp/action_text_overview.html) などですね。

またRubyのコア機能を拡張する [Active Support](https://railsguides.jp/active_support_core_extensions.html) の仕組みもとても強力で、Railsアプリ内ではRubyのコードを普段よりもさらに楽しく & 便利に書くことができます。
`#blank?` や `#present?` はもちろん、`#with_options` やInflectionの仕組みなどは使っているエンジニアの皆さんも多いのではないでしょうか？

アプリケーションの核となる機能とメソッドなどの細かい機能の両方で、かなり広い範囲を守っているのが今のRailsだと思っています。

## それでも手が届かない場面はある
それでも実際にアプリを開発していると、Railsの挙動を変えたい場面が出てくるものです。
そのときにRailsの文脈でいうと取ることのできる選択肢は次の二つです。

* モンキーパッチを当てる
* **Railsプラグインを利用する = 今日の本題**

いずれもRailsのコア機能を拡張（変更）するものですが、実装の抽象化の度合いが異なります。

| | どこに実装するの？ | 実装の例 |
| --- | --- | --- |
| モンキーパッチ | 開発しているアプリの中 | [kaminari/kaminariにモンキーパッチを当てた例](http://yamakichi.hatenablog.com/entry/2016/09/24/001219) |
| Railsプラグイン | Gemとしてインストール | [yamat47/activerecord_accessible_json](https://github.com/yamat47/activerecord_accessible_json) |

モンキーパッチは開発しているそのアプリの中に閉じた話ですが、Railsプラグインの場合は他アプリにも転用できるような仕組みです。

この記事ではこれ以降、Railsプラグインを使ったRailsの拡張についてお伝えしていきます。
コア実装を拡張したいと思ったときに、モンキーパッチを当てる以外にRailsプラグインを作るという選択肢もあるというのを伝えるのがこの記事の趣旨です。

## そもそもRailsプラグインって何？
> Railsのプラグインは、コアフレームワークを拡張したり変更したりするのに使用されます。プラグインは以下の機能を提供します。
>
> * 安定版コードベースに手を加えることなく最先端のアイディアを開発者同士で共有する手段を提供します。
> * アーキテクチャを分割し、それらのコード単位ごとに異なるスケジュールで修正や更新を進められるようにします。
> * コア開発者が価値ある新機能を実装しても、その全てオープンにすることなく共有できるようにします。
>
> 引用：[Rails プラグイン作成入門 - Railsガイド](https://railsguides.jp/plugins.html)

Railsプラグインの実体はただのRubyのGemで、`Gemfile` に記載してインストールするのが基本的な使い方です。

「Railsのコア実装を拡張するのに特化した特別な実装がされているGem」と捉えると大体よいです。
実装について特徴的なのは以下の点でしょうか：

* 一般的なGemは `bundle gem` コマンドから作ることが多いが、Railsプラグインは `rails plugin new` から作るのが一般的。
* コア機能を拡張されるためにRailtieの仕組みを使うことが多い。
* Gemのソースコードにテスト用のRailsアプリが内包されることが多い。

実際にどのようにプラグインを作っていくかは [Extracting a Gem from your Rails app](https://slides.com/sophiedeziel/extracting-a-gem-from-your-rails-app-16/fullscreen) が参考になります。

## モンキーパッチではなくRailsプラグインを作る利点
Railsプラグインを自作すると、アプリの中でモンキーパッチを当てるのに比べて様々なメリットを得られます。

### 拡張した内容のテストがしやすい
コア実装の拡張をする以上、そのテストは実際にRailsアプリを動かして行う必要があります。
そのためのダミーのアプリを作る仕組みやそれを使ったテストの仕組みがRailsプラグインには備わっているため、拡張した内容のテストがとてもしやすいです。

ただしRSpecでテストを書こうとすると標準の方法では難しいため、少し工夫する必要があります。
その際は [RailsプラグインGemの作成方法、RSpecテストまで含めたrails pluginの作り方 | EasyRamble](https://easyramble.com/create-rails-plugin-gem.html) という記事が参考になります。

### アプリケーションのコードベースを小さくできる
保守しやすいアプリを作る上で、アプリケーションのコードベースを小さくするのは大切なことです。

ただでさえアプリのコードはどんどん肥大化していってしまうものなので...
開発しているアプリに特化していない内容であればどんどん外に切り出すことで、保守しやすい状態を維持できます。

### （もし公開すれば）OSSのエコシステムを利用できる
RailsプラグインはGemであるため、OSSとして公開することができます（もちろん公開せずに利用することもできます）。
他のアプリでも利用してもらいフィードバックを受けることでよりライブラリを磨き上げることができます。

同じような拡張をしたい他の開発者のためにも積極的に公開したいなと思っています！

## Railsプラグインを作るときの注意点
一方でRailsプラグインを作るときに気をつけなければならないポイントもあります。

### 大袈裟な話になりがち
Railsプラグインを書くためには色々なことを考えなければなりません。
gemspecの内容、テスト用のアプリの構成、テストの書き方、Gemを公開するか、...などなど。

ちょっとしたパッチを当てたいだけという場合でもこれだけのことを考えなければならず、大袈裟な話になりがちです。
ただ一方でコア実装を拡張するのはそれだけ影響の大きいテーマであり、それだけ時間をかける必要があると考えています。

Railsプラグインを作るかどうかは別としてもかなり丁寧に議論をしながら拡張をするかどうかを検討することをオススメします。

### 管理するリポジトリが増える
「アプリに関係ないコードをソースコードから除くことができる」という利点は同時にこの懸念を生み出します。

複数リポジトリを保守していく仕組みやチームの文化が育っていない状態ではかなり慎重になることをオススメします。
特に開発メンバーが少ないチームの場合は致命的な課題になる可能性があります。

## 自作のRailsプラグインの紹介
上でも例にあげましたが、[yamat47/activerecord_accessible_json](https://github.com/yamat47/activerecord_accessible_json) というRailsプラグインを作りました。
詳しくはREADMEにまとめていますが、ActiveRecordのJson型カラムを扱いやすくするライブラリです。

```ruby
# Both author and tags are JSON typed columns.
Post.create(author: { 'name': 'yamat47', 'age': 27 }, tags: %w[Rails TDD])

post = Post.last
post.author.class #=> ActiveSupport::HashWithIndifferentAccess
post.author['name'] #=> 'yamat47'
post.author['name'] == post.author[:name] #=> true

post.author = { name: 'Andy', age: 30 }
post.author.class #=> ActiveSupport::HashWithIndifferentAccess
post.author['name'] #=> 'Andy'
post.author['name'] == post.author[:name] #=> true

# If attribute's value is not changeable into HashWithIndifferentAccess,
# this gem does nothing.
post.tags.class #=> Array
```

弊社が運営している「くらそうね」はRailsを使って作られていますが、ここ最近でJson型カラムを使うケースが増えていました。
このカラムを扱うときだけキーが文字列なのがちょっと使いづらかったので... 値にアクセスしやすくするためにRailsプラグインを作ってみました。

このライブラリの開発や運用についても色々お伝えしたいことはあるのですが、またいつかの機会にします！

## まとめ
それ自体がかなり巨大になってしまっているRuby on Railsに対してコア実装を拡張するのは非常に影響が大きいです。
だからこそ慎重に、そして丁寧に行う必要があり、そのためにRailsが準備しているレールがRailsプラグインです。

モンキーパッチを当てたいなと思ったとき、この記事とそしてRailsプラグインのことを思い出していただけると嬉しいです。
（ほどほどな範囲で）Railsプラグインをどんどん活用して、自分たちだけのRailsを作っていきましょう！

## 最後に
クラッソーネではエンジニアを積極採用中です！
Railsが大好きなエンジニアの皆さんもそこそこ好きな皆さんも、興味を持っていただけたらお気軽にご連絡ください。

https://recruit.jobcan.jp/crassone/list?category_id=15694
