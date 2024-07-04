import localFont from 'next/font/local'
import { Literata } from 'next/font/google';

export const Satoshi = localFont({
  src: [
    {
      path: './Satoshi/Satoshi-LightItalic.woff',
      weight: '300',
      style: 'italic',
    },
    {
      path: './Satoshi/Satoshi-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: './Satoshi/Satoshi-Italic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: './Satoshi/Satoshi-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Satoshi/Satoshi-MediumItalic.woff',
      weight: '500',
      style: 'italic',
    },
    {
      path: './Satoshi/Satoshi-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Satoshi/Satoshi-BoldItalic.woff',
      weight: '700',
      style: 'italic',
    },
    {
      path: './Satoshi/Satoshi-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: './Satoshi/Satoshi-BlackItalic.woff',
      weight: '900',
      style: 'italic',
    },
    {
      path: './Satoshi/Satoshi-Black.woff',
      weight: '900',
      style: 'normal',
    },
  ],
})

export const literata = Literata({ subsets: ["latin"] }); 
export const literataItalic = Literata({ subsets: ['latin'], style: 'italic' })
