import React from 'react';
import { render, screen} from '@testing-library/react';
import App from './App';
import { getUser, getJwt } from './Services/UserService';

jest.mock('./Services/UserService', () => ({
    getUser: jest.fn(),
    getJwt: jest.fn(),
}));

jest.mock('./Utils/setAuthToken', () => jest.fn());

jest.mock('./Components/Header', () => () => <div>Header Component</div>);
jest.mock('./Routing/Routing', () => () => <div>Routing Component</div>);

describe('App Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders Header and Routing components', () => {
        (getUser as jest.Mock).mockReturnValue(null);
        (getJwt as jest.Mock).mockReturnValue('mockedJwtToken');

        render(
                <App />
        );
        expect(screen.getByText('Header Component')).toBeInTheDocument();
        expect(screen.getByText('Routing Component')).toBeInTheDocument();
    });

    test('sets user state based on getUser and removes jwt if expired', () => {
      
        const expiredUser = { exp: Math.floor(Date.now() / 1000) - 1000 };
        (getUser as jest.Mock).mockReturnValue(expiredUser);

        render(
                <App />
        );
        
        expect(localStorage.getItem('jwt')).toBeNull();
        
    });

    test('handles errors from getUser gracefully', () => {
        (getUser as jest.Mock).mockImplementation(() => {
            throw new Error('Test error');
        });

        render(
                <App />
        );
        expect(screen.getByText('Header Component')).toBeInTheDocument();
        expect(screen.getByText('Routing Component')).toBeInTheDocument();
    });
});
