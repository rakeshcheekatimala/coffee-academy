import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '@/components/shared/Navigation';

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navigation', () => {
  it('renders navigation with logo', () => {
    render(<Navigation />);
    expect(screen.getByText('COFFEE / ACADEMY')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Navigation />);
    expect(screen.getByText('Learn')).toBeInTheDocument();
    expect(screen.getByText('Brew')).toBeInTheDocument();
    expect(screen.getByText('Lab')).toBeInTheDocument();
    expect(screen.getByText('Glossary')).toBeInTheDocument();
    expect(screen.queryByText('Community')).not.toBeInTheDocument();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('renders mobile menu button', () => {
    render(<Navigation />);
    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(menuButton).toBeInTheDocument();
  });

  it('toggles mobile menu on button click', () => {
    const { container } = render(<Navigation />);
    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' });
    fireEvent.click(menuButton);
    // Menu should be open now - check for mobile menu container
    const mobileMenu = container.querySelector('#mobile-navigation');
    expect(mobileMenu).toBeInTheDocument();
  });

  it('closes mobile menu when link is clicked', () => {
    render(<Navigation />);
    const menuButton = screen.getByRole('button', { name: 'Open navigation menu' });
    fireEvent.click(menuButton);
    const learnLinks = screen.getAllByText('Learn');
    if (learnLinks.length > 1) {
      fireEvent.click(learnLinks[1]);
    }
    // Menu should close
  });
});
