import React from 'react';
import editIcon from '../edit.svg'
import deleteIcon from '../delete.svg'
import { Link } from 'react-router-dom';

class Course extends React.Component {
  render () {
    const {id, name, description, date, duration} = this.props.course;
    const deleteCourse = () => this.props.deleteCourse(id);
    const editCourse = () => this.props.setEditCourseId(id);
    return (
      <div className='course'>
        <div>{date}</div>
        <div className='name'>{name}</div>
        <div>{description}</div>
        <div>{duration}</div>
        <div>
          <Link to='/edit'>
            <button onClick={editCourse}>
                <img src={editIcon} alt='edit' width='14px' /></button>
          </Link>
          <button onClick={deleteCourse}>
              <img src={deleteIcon} alt='delete' width='14px' /></button>
        </div>
      </div>
    )
  }
}

export default Course;