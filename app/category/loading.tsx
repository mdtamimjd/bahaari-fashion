import Image from 'next/image'
import Loading from '@/public/loading.gif'

export default function loading() {
    return (
        <div className='w-full'>
            <div className='w-[250] h-[250] mx-auto mt-20 relative'>
                <Image
                    src={Loading}
                    alt='loading'
                    fill
                    sizes='1'
                    loading='eager'
                />
            </div>
        </div>
    )
}
