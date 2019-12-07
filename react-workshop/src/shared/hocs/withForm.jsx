import React from 'react';

export default function withForm(Cmp, initialState, schema) {
    return class extends React.Component {
        state = {
            form: initialState,
            errors: null
        };

        controlChangeHandler = name => e => {
            const newValue = e.target.value;
            this.setState(({ form }) => {
                return { form:  { ...form, [name]: newValue }};
            });
        }

        getFormState = () => {
            return this.state.form;
        }

        getErrorsState = () => {
            return this.state.errors
        }

        runValidations = () => {
            return schema && schema.validate(this.state.form, {abortEarly: false}).then(() => this.state.form).catch(err => {
                const errors = err.inner.reduce((acc, {path, message}) => {
                    acc[path] = (acc[path] || []).concat(message);
                    return acc;
                }, {})
                this.setState({ errors })
                
            }) || Promise.resolve()
        }

        render() {
            return <Cmp { ...this.props } controlChangeHandler={this.controlChangeHandler} getFormState={this.getFormState} runValidations={this.runValidations} getErrorsState={this.getErrorsState}></Cmp>
        }
    }
}