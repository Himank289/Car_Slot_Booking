import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../Routing/ProtectedRoute';
import { getUser } from '../Services/UserService';

jest.mock('../Services/UserService', () => ({
  getUser: jest.fn(),
}));

const MockComponent = () => <div>Protected Content</div>;

describe('ProtectedRoute Component', () => {
  test('renders Outlet when user is present', async () => {
    (getUser as jest.Mock).mockReturnValue({ name: 'Test User' });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/protected" element={<ProtectedRoute />}>
            <Route index element={<MockComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('redirects to login when no user is present', () => {
    (getUser as jest.Mock).mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/protected" element={<ProtectedRoute />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
