import TwitterShareButton from './TwitterShareButton'
import HatenaBlogShareButton from './HatenaBlogShareButton'

export default function ShareButtons({ title, url, className }: { title: string, url: string, className?: string }) {
  return (
    <div className={`${className} flex justify-start items-top`}>
      <span className='mr-3'>
        <TwitterShareButton text={title} url={url} />
      </span>
      <span>
        <HatenaBlogShareButton />
      </span>
    </div>
  )
}
