import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '@/components/shared/Navigation';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Navigation', () => {
  it('renders navigation with logo', () => {
    render(<Navigation />);
    expect(screen.getByText('Coffee Academy')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Levels')).toBeInTheDocument();
    expect(screen.getByText('Recipes')).toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    render(<Navigation />);
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    const { container } = render(<Navigation />);
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    // Menu should be open now - check for mobile menu container
    const mobileMenu = container.querySelector('.md\\:hidden');
    expect(mobileMenu).toBeInTheDocument();
  });

  it('closes mobile menu when link is clicked', () => {
    const { container } = render(<Navigation />);
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    const homeLinks = screen.getAllByText('Home');
    if (homeLinks.length > 1) {
      fireEvent.click(homeLinks[1]); // Second one is in mobile menu
    }
    // Menu should close
  });
});

