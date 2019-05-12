import { useSpring } from 'react-spring';

const enter = useSpring({
  y: 0,
  o: 1,
  from: {
    y: 100,
    o: 0,
  },
});

const enterRevers = useSpring({
  y: 0,
  o: 1,
  from: {
    y: -100,
    o: 0,
  },
});

const exit = useSpring({
  y: -100,
  o: 0,
  from: {
    y: 0,
    o: 1,
  },
});

const exitRevers = useSpring({
  y: 100,
  o: 0,
  from: {
    y: 0,
    o: 1,
  },
});

export default {
  enter,
  enterRevers,
  exit,
  exitRevers,
};
