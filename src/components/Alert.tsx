import { useEffect } from 'react';

type PropsType = {
  alert: {
    show: boolean;
    type: string;
    msg: string;
  };
  removeAlert: Function;
  list: any;
};
const Alert = (props: PropsType) => {
  const { alert, removeAlert, list } = props;
  const { type, msg } = alert;

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [list]);
  return <p className={`alert-${type}`}>{msg}</p>;
};

export default Alert;
