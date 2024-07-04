import React from 'react'

export default function GlowBall({size, className}: {size: number, className?: string}) {
  return (
    <div className={`absolute ${className}`}
     style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: 'radial-gradient(50% 50% at 50% 50%, rgba(155, 181, 71, 0.72) 0%, rgba(71, 158, 76, 0.00) 100%)',
      zIndex: 0,
    }}></div>
  )
}
