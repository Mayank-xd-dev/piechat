/* eslint-disable react/no-unescaped-entities */
import './styles/CometChatApp.css';
import { AppContextProvider } from './context/AppContext';
import { CometChatHome } from './components/CometChatHome/CometChatHome';
import { useEffect, useState } from 'react';
import { useCometChatContext } from './context/CometChatContext';
import { fontSizes } from './styleConfig';
import { CometChat } from '@cometchat/chat-sdk-javascript';
import useSystemColorScheme from './customHooks';
import { generateExtendedColors } from './utils/utils';
import { CometChatUIKit } from '@cometchat/chat-uikit-react';
import '@cometchat/chat-uikit-react/css-variables.css';


interface CometChatHomeProps {
  /** Default user for the chat application (optional). */
  user?: CometChat.User;
  /** Default group for the chat application (optional). */
  group?: CometChat.Group;
}

/**
 * Main application component for the CometChat Builder.
 *
 * @param {CometChatHomeProps} props - The component props.
 * @returns {JSX.Element} The rendered CometChatApp component.
 */
function CometChatApp({ user, group }: CometChatHomeProps) {
  const [loggedInUser, setLoggedInUser] = useState<CometChat.User | null>(null);
  const { styleFeatures, setStyleFeatures } = useCometChatContext();

  const systemTheme = useSystemColorScheme();

  /**
   * Handles the logout process and redirects to login page
   */
  // const handleLogout = async () => {
  //   try {
  //     await CometChatUIKit.logout();
  //     setLoggedInUser(null);
  //     window.location.href = '/login';
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };

  /**
   * Effect to handle login and logout listeners
   */
  useEffect(() => {
    CometChat.addLoginListener(
      'runnable-sample-app',
      new CometChat.LoginListener({
        loginSuccess: (user: CometChat.User) => {
          setLoggedInUser(user);
        },
        logoutSuccess: () => {
          setLoggedInUser(null);
          window.location.href = '/login';
        },
      })
    );

    return () => CometChat.removeLoginListener('runnable-sample-app');
  }, []);

  /**
   * Fetches the currently logged-in CometChat user and updates the state.
   * Runs once on component mount.
   */
  useEffect(() => {
    CometChatUIKit.getLoggedinUser().then((user: CometChat.User | null) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser(null);
      }
    });
  }, []);

  /**
   * Converts a hex color code to an RGBA format with a given opacity.
   *
   * @param {string} hex - The hex color code.
   * @param {number} alpha - The opacity value (0 to 1).
   * @returns {string} The RGBA color string.
   */
  const hexToRGBA = (hex: string, alpha: number) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  /**
   * Updates theme-related styles dynamically based on user settings.
   * It modifies CSS variables for text colors and primary colors.
   */
  useEffect(() => {
    const handleColorPickerChange = () => {
      const checkForRootElement = () => {
        const currentTheme = styleFeatures?.theme;

        if (!currentTheme) {
          console.warn('Theme not found:', currentTheme);
          return;
        }

        const root = document.getElementById(`${currentTheme}-theme`);
        if (!root) {
          console.warn('Root element not found. Ensure the theme data attribute is correctly set.');
          return;
        }

        const isLightTheme = currentTheme === 'light';
        const isDarkTheme = currentTheme === 'dark';
        const isSystemLight = currentTheme === 'system' && systemTheme === 'light';
        const isSystemDark = currentTheme === 'system' && systemTheme === 'dark';

        const brandColor = styleFeatures.color.brandColor;

        const properties = [
          '--cometchat-primary-color',
          '--cometchat-border-color-highlight',
          '--cometchat-text-color-highlight',
          '--cometchat-icon-color-highlight',
          '--cometchat-primary-button-background',
        ];

        properties.forEach((property) => root.style.setProperty(property, brandColor));
        generateExtendedColors();

        // Handle primary text color
        if ((isLightTheme || isSystemLight) && styleFeatures.color.primaryTextLight === '#FFFFFF') {
          setStyleFeatures({
            ...styleFeatures,
            color: { ...styleFeatures.color, primaryTextLight: '#141414' },
          });
          root.style.setProperty('--cometchat-text-color-primary', '#141414');
        } else if ((isDarkTheme || isSystemDark) && styleFeatures.color.primaryTextDark === '#141414') {
          setStyleFeatures({
            ...styleFeatures,
            color: { ...styleFeatures.color, primaryTextDark: '#FFFFFF' },
          });
          root.style.setProperty('--cometchat-text-color-primary', '#FFFFFF');
        } else {
          root.style.setProperty(
            '--cometchat-text-color-primary',
            isLightTheme || isSystemLight ? styleFeatures.color.primaryTextLight : styleFeatures.color.primaryTextDark
          );
        }

        // Handle secondary text color
        if ((isLightTheme || isSystemLight) && styleFeatures.color.secondaryTextLight === '#989898') {
          setStyleFeatures({
            ...styleFeatures,
            color: { ...styleFeatures.color, secondaryTextLight: '#727272' },
          });
          root.style.setProperty('--cometchat-text-color-secondary', '#727272');
        } else if ((isDarkTheme || isSystemDark) && styleFeatures.color.secondaryTextDark === '#727272') {
          setStyleFeatures({
            ...styleFeatures,
            color: { ...styleFeatures.color, secondaryTextDark: '#989898' },
          });
          root.style.setProperty('--cometchat-text-color-secondary', '#989898');
        } else {
          root.style.setProperty(
            '--cometchat-text-color-secondary',
            isLightTheme || isSystemLight
              ? styleFeatures.color.secondaryTextLight
              : styleFeatures.color.secondaryTextDark
          );
        }
      };

      // Use setTimeout to ensure DOM is ready
      setTimeout(checkForRootElement, 100);
    };
    const handleFontChange = () => {
      document.documentElement.style.setProperty('--cometchat-font-family', styleFeatures.typography.font);
    };

    const handleFontSizeChange = () => {
      const selectedFontSize = fontSizes[styleFeatures.typography.size as keyof typeof fontSizes] || {};
      Object.entries(selectedFontSize)?.forEach(([key, val]) => {
        document.documentElement.style.setProperty(key, val);
      });
    };

    if (styleFeatures) {
      handleColorPickerChange();
      handleFontChange();
      handleFontSizeChange();
    }
  }, [setStyleFeatures, styleFeatures, styleFeatures.theme, systemTheme, loggedInUser]);

  // Run color change effect after a short delay to ensure elements are rendered
  useEffect(() => {
    // Apply a semi-transparent color overlay to a canvas element
    const recolorCanvasContent = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set blend mode to 'source-atop' so the fill color applies **only** to existing (non-transparent) pixels
        ctx.globalCompositeOperation = 'source-atop';

        // Set fill color with opacity and apply it to the entire canvas
        ctx.fillStyle = hexToRGBA(styleFeatures.color.brandColor, 0.3);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Reset blend mode to default ('source-over') so future drawings behave normally
        ctx.globalCompositeOperation = 'source-over';
      }
    };
    // Recursive function to find and recolor canvases inside Shadow DOM and nested elements
    const findAndRecolorCanvases = (element: Element | ShadowRoot) => {
      if (element instanceof Element && element.matches('canvas')) {
        recolorCanvasContent(element as HTMLCanvasElement);
      }

      // Search within child elements and Shadow DOM recursively
      element.childNodes.forEach((child) => {
        if (child instanceof Element) {
          findAndRecolorCanvases(child);
          if (child.shadowRoot) {
            findAndRecolorCanvases(child.shadowRoot);
          }
        }
      });
    };
    // Apply color change to all canvases inside elements with the target class
    const applyColorChange = () => {
      document.querySelectorAll('.cometchat-audio-bubble-incoming').forEach((parentDiv) => {
        findAndRecolorCanvases(parentDiv);
      });
    };
    setTimeout(applyColorChange, 100); // Wait for rendering
  }, [styleFeatures.color.brandColor]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement?.classList.contains('cometchat-search-bar__input')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="CometChatApp">
      <AppContextProvider>
        {loggedInUser ? (
          <>
            {/* <button
              className="logout-btn"
              style={{
                position: 'absolute',
                top: 20,
                right: 5, // Moved more to the left
                zIndex: 1000,
              }}
              onClick={handleLogout}
              title="Logout"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.30775 20.5C4.80258 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.1974 3.5 18.6923V5.30775C3.5 4.80258 3.675 4.375 4.025 4.025C4.375 3.675 4.80258 3.5 5.30775 3.5H11.2598C11.4724 3.5 11.6506 3.57183 11.7943 3.7155C11.9378 3.859 12.0095 4.03717 12.0095 4.25C12.0095 4.46283 11.9378 4.641 11.7943 4.7845C11.6506 4.92817 11.4724 5 11.2598 5H5.30775C5.23075 5 5.16025 5.03208 5.09625 5.09625C5.03208 5.16025 5 5.23075 5 5.30775V18.6923C5 18.7692 5.03208 18.8398 5.09625 18.9038C5.16025 18.9679 5.23075 19 5.30775 19H11.2598C11.4724 19 11.6506 19.0718 11.7943 19.2155C11.9378 19.359 12.0095 19.5372 12.0095 19.75C12.0095 19.9628 11.9378 20.141 11.7943 20.2845C11.6506 20.4282 11.4724 20.5 11.2598 20.5H5.30775ZM17.6173 12.75H9.84625C9.63342 12.75 9.45517 12.6782 9.3115 12.5345C9.168 12.391 9.09625 12.2128 9.09625 12C9.09625 11.7872 9.168 11.609 9.3115 11.4655C9.45517 11.3218 9.63342 11.25 9.84625 11.25H17.6173L15.6943 9.327C15.5558 9.1885 15.4849 9.01958 15.4818 8.82025C15.4786 8.62092 15.5494 8.44367 15.6943 8.2885C15.8391 8.13333 16.0148 8.05317 16.2213 8.048C16.4276 8.043 16.6083 8.118 16.7635 8.273L19.8578 11.3672C20.0384 11.5481 20.1288 11.759 20.1288 12C20.1288 12.241 20.0384 12.4519 19.8578 12.6328L16.7635 15.727C16.6148 15.8757 16.4383 15.949 16.2338 15.947C16.0293 15.9452 15.8494 15.8667 15.6943 15.7115C15.5494 15.5563 15.4796 15.3782 15.4848 15.177C15.4898 14.9757 15.5648 14.8026 15.7098 14.6578L17.6173 12.75Z" fill="#F44649" />
              </svg>

            </button> */}

            <CometChatHome defaultGroup={group} defaultUser={user} />
          </>
        ) : <LoginPlaceholder />}
      </AppContextProvider>
    </div>
  );
}

const LoginPlaceholder = () => {
  return (
    <div className="login-placeholder">
      <div className="login-content">
        <h2>Welcome to CometChat</h2>
        <p>Please log in to start chatting</p>
        <div className="login-buttons">
          <button
            className="login-button"
            onClick={() => {
              // This will be handled by the CometChatLogin component
              window.location.href = '/login';
            }}
          >
            Login
          </button>
          <button
            className="signup-button"
            onClick={() => {
              // This will be handled by the CometChatLogin component
              window.location.href = '/signup';
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default CometChatApp;
