import React from 'react'

const Section = ({sections}) => {
  return (
    <div>
        {
            sections.map((section) => {
                return <div className="section">
                    {section}
                </div>
            })
        }
    </div>
  )
}

export default Section