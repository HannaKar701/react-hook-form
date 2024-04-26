import RegistrationForm from './components/form/RegistrationForm';
import { constants } from './constants/constants';

import './App.css';

const App = () => {
    return (
        <div className="wrapper">
            <h1>{constants.title}</h1>
            <RegistrationForm />
        </div>
    );
};

export default App;
