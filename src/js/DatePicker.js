import { useEffect, useState } from '@wordpress/element';
import { ExperimentalOrderShippingPackages } from '@woocommerce/blocks-checkout';


export const DatePicker = () => {
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
    // console.log(4);
    // console.log(value2);
    // alert(5);
    // if (value2 == 1) {


    // }
    // alert(4);

    return (
        <div>
            {value3 ?  (
                    <div>The card message will render here.</div>
            ) : null 
        }
        </div>
    );
};
