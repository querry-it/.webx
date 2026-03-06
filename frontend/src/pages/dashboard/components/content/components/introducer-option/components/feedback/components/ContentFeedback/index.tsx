import classNames from 'classnames/bind';
import styles from './ContentFeedback.module.css';
import RatingFeedback from './components/RatingFeedback/index';
import FeedbackReview from './components/FeedbackReview/index';
const cx = classNames.bind(styles);

export default function FeedBack({ feedbacks }) {
  return (
    <div className={cx('feedback__grid')}>
      <RatingFeedback feedbacks={feedbacks.summary}></RatingFeedback>
      <FeedbackReview feedbacks={feedbacks.list}></FeedbackReview>
    </div>
  );
}
