import { useEffect, useState } from '@wordpress/element';

export const ExampleComponent = () => {
  const [value1, setValue1] = useState(false);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState(false);

  useEffect(() => {
    fetch('/wp-json/my-api/v1/my-boolean-values')
      .then(response => response.json())
      .then(data => {
        console.log(data);

        setValue1(data.value1);
        setValue2(data.value2);
        setValue3(data.value3);
      });
  }, []);






  return (
    <div className="first-api-example-component">
      <p>Value 1: {value1 ? 'True' : 'False'}</p>
      <p>Value 2: {value2 ? 'True' : 'False'}</p>
      <p>Value 3: {value3 ? 'True' : 'False'}</p>
    </div>
  );
};
