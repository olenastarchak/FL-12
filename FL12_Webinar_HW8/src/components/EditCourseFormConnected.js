import { connect } from 'react-redux';
import EditCourseForm from './EditCourseForm';
import { editCourse } from '../redux/actions';

const mapStateToProps = state => ({
  course: state.courses.find(el => el.id === state.editCourseId)
});

const mapDispatchToProps = dispatch => ({
  editCourse: course => dispatch(editCourse(course))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCourseForm);