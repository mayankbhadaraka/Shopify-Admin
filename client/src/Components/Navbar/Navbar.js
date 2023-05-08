import { TopBar, ActionList, Icon, Frame, Text } from "@shopify/polaris";
import { ArrowLeftMinor, QuestionMarkMajor } from "@shopify/polaris-icons";
import { useState, useCallback, useContext } from "react";
import { Navigate } from "react-router-dom";
import context from "../../Context/context";
import Router from "../Router/Router";
import { useNavigate } from "react-router-dom";
import ToastMsg from "../Toast/toast";

function Navbar() {
  const navigator = useNavigate();
  const { shop } = useContext(context);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const pic =
    Object.keys(shop).length > 0
      ? shop.storeName.slice(0, 2).toUpperCase()
      : null;
  const toggleIsUserMenuOpen = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const toggleIsSecondaryMenuOpen = useCallback(
    () => setIsSecondaryMenuOpen((isSecondaryMenuOpen) => !isSecondaryMenuOpen),
    []
  );

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue("");
  }, []);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  const handleNavigationToggle = useCallback(() => {
    console.log("toggle navigation visibility");
  }, []);

  const logo = {
    width: 124,
    topBarSource: "https://polaris.shopify.com/images/shopify-logo.svg",
    url: "#",
  };
  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            {
              content: "Back to Shopify",
              icon: ArrowLeftMinor,
              onAction: () => {
                window.location.href =
                  "https://admin.shopify.com/store/mayank-traning/settings/general";
              },
            },
          ],
        },
        {
          items: [
            {
              content: "Logout",
              onAction: () => {
                navigator("/logout");
              },
            },
          ],
        },
      ]}
      name={shop.storeName}
      detail={shop.domain}
      initials={pic}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: "Shopify help center" },
        { content: "Community forums" },
      ]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
      showFocusBorder
    />
  );

  const secondaryMenuMarkup = (
    <TopBar.Menu
      activatorContent={
        <span>
          <Icon source={QuestionMarkMajor} />
          <Text as="span" visuallyHidden>
            Secondary menu
          </Text>
        </span>
      }
      open={isSecondaryMenuOpen}
      onOpen={toggleIsSecondaryMenuOpen}
      onClose={toggleIsSecondaryMenuOpen}
      actions={[
        {
          items: [{ content: "Community forums" }],
        },
      ]}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      secondaryMenu={secondaryMenuMarkup}
      searchResultsVisible={isSearchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return (
    <>
      <div className="navbar">
        <Frame topBar={topBarMarkup} logo={logo}>
          <Router />
          <ToastMsg />
        </Frame>
      </div>
    </>
  );
}

export default Navbar;
