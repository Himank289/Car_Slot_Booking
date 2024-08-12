import React from 'react';
import { render } from '@testing-library/react';
import Logout from '../Authentication/Logout';
import { logout } from '../Services/UserService';

jest.mock('../Services/UserService', () => ({
    logout: jest.fn(),
}));

describe('Logout Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('calls logout function and redirects to "/" on render', () => {
        const originalLocation = window.location;
        delete (window as any).location;
        (window as any).location = {
            href: ''
        };

        render(<Logout />);
        expect(logout).toHaveBeenCalledTimes(1);
        expect(window.location.href).toBe('/');
        window.location = originalLocation;
    });
});
