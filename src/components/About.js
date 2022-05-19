import React from 'react'
import Navbar from './Navbar'

const About = () => {

  return (
    <div className='home'>
        <Navbar active='About' links={[
          ['Home', ''],
          ['Student', 'student'],
          ['Teacher', 'teacher'],
          ['About', 'about']
        ]}/>
        <div className="container">
          <div className="ShomeBox">
            <div className="left1">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae eaque, neque vero quis blanditiis nihil praesentium corrupti pariatur veritatis cumque ipsa assumenda ducimus sequi laboriosam, quas repellendus tempore corporis. Eligendi numquam quas quis laborum voluptatum tempore tenetur deleniti similique cupiditate, est reprehenderit asperiores animi eius delectus illo, commodi modi veritatis. Et distinctio error vel necessitatibus quaerat fuga nemo dicta repellat dolorum enim accusantium quam, facilis ex reiciendis quasi provident asperiores corporis sunt quisquam reprehenderit aperiam alias odit? Architecto facere, totam quam perspiciatis quaerat laudantium nostrum ipsum maxime eveniet et nobis quia? Vitae perferendis est quasi mollitia labore voluptatum reprehenderit aperiam?
            </div>
          </div>
        </div>
    </div>
  )
}

export default About