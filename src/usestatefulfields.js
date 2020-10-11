import React, { useState } from "react";
// this will only work for registration and login

export function useStatefulFields() {
    const [value, setValue] = useState({});
    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
        console.log("useStatefulFields value: ", value);
    };

    return [value, handleChange];
}
