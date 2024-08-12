import React from 'react';
import { render, screen,fireEvent } from '@testing-library/react';
import LoginPage from '../Authentication/LoginPage';
import { getUser, login } from '../Services/UserService';

jest.mock('../Services/UserService', () => ({
    getUser: jest.fn(),
    login: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    useLocation: () => ({ state: { from: '/' } }),
    Navigate: () => <div>Redirected</div>,
}));

describe('LoginPage Component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('should render the login form with initial elements', () => {
        render(
                <LoginPage />
        );

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    }); 

    test('should display validation errors for invalid inputs', async () => {
        render(
                <LoginPage/>
        );

        fireEvent.input(screen.getByLabelText('Email'), {
            target: { value: 'invalidemail' }
        });
        fireEvent.input(screen.getByLabelText('Password'), {
            target: { value: 'short' }
        });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(await screen.findByText('Please enter valid email address.')).toBeInTheDocument();
        expect(await screen.findByText('Password should be at least 8 characters.')).toBeInTheDocument();
    });

    test('should display form error message on login failure', async () => {
        (getUser as jest.Mock).mockReturnValue(null);
        (login as jest.Mock).mockRejectedValueOnce({
            response: { status: 404 }
        });

        render(
                <LoginPage />
            
        );

        fireEvent.input(screen.getByLabelText('Email'), {
            target: { value: 'test@example.com' }
        });
        fireEvent.input(screen.getByLabelText('Password'), {
            target: { value: 'password123' }
        });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(await screen.findByText('Invalid username or password')).toBeInTheDocument();
    });

    test('should redirect if user is already logged in', () => {
        (getUser as jest.Mock).mockReturnValue({});

        const { container } = render(
                <LoginPage />
        );

        expect(container.innerHTML).toContain('Redirected');
    });
    });
