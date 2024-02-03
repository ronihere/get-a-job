import React from 'react'
import ReactMarkdown from 'react-markdown';
interface MarkDownProps {
    children : string
}

export default function Markdown({children} : MarkDownProps) {
  return (
      <ReactMarkdown
          className="space-y-3"
          components={{
              ul: (props) => <ul className='list-inside list-disc' {...props} />,
              a : (props) => <a target='_blank' className='text-green-500 underline' {...props}/>
      }}>
      {children}
    </ReactMarkdown>
  )
}
