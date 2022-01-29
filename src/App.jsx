import { useEffect, useState } from 'react';
import { interval, fromEvent } from 'rxjs';
import { debounceTime, buffer, map, filter } from 'rxjs/operators';
import Stopwatch from './components/Stopwatch';
import { Button, Container } from './App.styled';

function App() {
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState('stop');

  const stopwatch$ = interval(1000);

  useEffect(() => {
    if (status === 'run') {
      const sub = stopwatch$.subscribe(() => setTime(state => state + 1000));
      return () => sub.unsubscribe();
    }
  }, [status, time]);

  useEffect(() => {
    const waitBtn = document.querySelector('#waitBtn');

    const click$ = fromEvent(waitBtn, 'click');

    click$.pipe(
      buffer(click$.pipe(debounceTime(300))),
      map(clicks => clicks.length),
      filter(clicksLength => clicksLength === 2),
    );

    click$.subscribe(() => pause());
  }, []);

  const start = () => setStatus('run');

  const pause = () => setStatus('stop');

  const reset = () => setTime(0);

  const stop = () => {
    reset();
    pause();
  };

  return (
    <div>
      <Stopwatch time={time} />
      <Container>
        <Button onClick={status === 'run' ? stop : start}>
          {status === 'run' ? 'Stop' : 'Start'}
        </Button>

        <Button id="waitBtn" disabled={status === 'stop'}>
          Wait
        </Button>

        <Button onClick={reset} disabled={status === 'stop'}>
          Reset
        </Button>
      </Container>
    </div>
  );
}
export default App;
