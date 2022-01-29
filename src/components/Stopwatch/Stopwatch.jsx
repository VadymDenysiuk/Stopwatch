import PropTypes from 'prop-types';
import { Container, Header } from './Stopwatch.styled';

export default function StopWatch({ time }) {
  let seconds = Math.floor(time / 1000) % 60;
  let minutes = Math.floor(time / 60000) % 60;
  let hours = Math.floor(time / 3600000);

  return (
    <>
      <Header>STOPWATCH</Header>
      <Container>
        {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} :{' '}
        {String(seconds).padStart(2, '0')}
      </Container>
    </>
  );
}
StopWatch.propTypes = {
  time: PropTypes.number,
};
