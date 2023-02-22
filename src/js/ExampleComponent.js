/*
 * An example component that will be rendered at the bottom of the sidebar in
 * the Cart and Checkout blocks.
 */
// export const ExampleComponent = ( { data } ) => {
// 	return (
// 		<div className="first-api-example-component">
// 			Data passed to this component: { data[ 'example-data' ] }
// 		</div>
// 	);
// };


import { useEffect, useState } from '@wordpress/element';


export const ExampleComponent = () => {
  const [value1, setValue1] = useState(false);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState(false);

  useEffect(() => {
    fetch('/wp-json/my-api/v1/my-boolean-values')
      .then(response => response.json())
      .then(data => {
        setValue1(data.value1);
        setValue2(data.value2);
        setValue3(data.value3);
      });
  }, []);
  console.log(4);
  console.log(value2);
  // alert(5);
  // if (value2 == 1) {


  // }

  return (
    <div className="first-api-example-component">
      <p>Value 1: {value1 ? 'True' : 'False'}</p>
      <p>Value 2: {value2 ? 'True' : 'False'}</p>
      <p>Value 3: {value3 ? 'True' : 'False'}</p>
    </div>
  );
};
