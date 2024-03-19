import { Link, generatePath } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import localeOptions from '@qc/template/locales'

import LanguageSvg from '@qc/icons/navigation/language.svg'
import DropdownSvg from '@qc/icons/navigation/dropdown.svg'
import UserSvg from '@qc/icons/contents/user.svg'
import LogoutSvg from '@qc/icons/navigation/leave.svg'
import LogoSvg from '@qc/template/assets/logo.svg'
import Dropdown from '../../components/Dropdown'
import MobileSidebar from '../../components/MobileSidebar'
import { ROOT_ROUTE } from '../../constants/routes'
import useComponent from './useComponent'
import './styles.css'

interface HeaderProps {
  className?: string
  minimalistic?: boolean
}

export default function Header(props: HeaderProps) {
  const { className, minimalistic } = props
  const {
    store: { myAccount },
    data: {
      language,
      menuOptions,
      menuMobileOptions,
      menuSidebarOpen,
      selectedLanguageOption,
      isOffline,
      isGuestAccess,
    },
    handlers: {
      toggleLogoutModal,
      toggleLanguageModal,
      toggleMenuSidebarOpen,
      handleSelectLanguage,
    },
  } = useComponent()
  const { t } = useTranslation()
  console.log("myAccount: ",myAccount);
  return (
    // <header className={cn('header', className, { 'header-auth': myAccount })}>
    <header className="header flex justify-between items-center p-3"> 
      {/* <div className="header-nav header-nav-left" /> */}
      <div className="logo w-full flex">
        {minimalistic || isGuestAccess ? (
          <LogoSvg className="icon" />
        ) : (
          <>
          {/* <div className='flex'>
            <Link to={generatePath(ROOT_ROUTE)}>
                <LogoSvg className="icon" />
            </Link>
          </div> */}
          {
            myAccount &&
            <div className='flex flex-1 justify-between items-center pr-6'>
                <Link to='#' className="whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                    <span className="flex flex-col items-center">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19c0 .6.4 1 1 1h3v-3c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v3h3c.6 0 1-.4 1-1v-8.5"/>
                        </svg>
                        <p className='nav-menu-text'>Home</p>
                    </span> 
                </Link>
                <Link to='/inbox' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                  <span className="flex flex-col items-center">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M4 3a1 1 0 0 0-1 1v8c0 .6.4 1 1 1h1v2a1 1 0 0 0 1.7.7L9.4 13H15c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1H4Z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M8 17.2h.1l2.1-2.2H15a3 3 0 0 0 3-3V8h2c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1h-1v2a1 1 0 0 1-1.7.7L14.6 18H9a1 1 0 0 1-1-.8Z" clip-rule="evenodd"/>
                    </svg>
                    <p className='nav-menu-text'>Inbox</p>
                  </span>            
                </Link>
                <Link to='/askNow' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                    <span className="flex flex-col items-center">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm9-3a1.5 1.5 0 0 1 2.5 1.1 1.4 1.4 0 0 1-1.5 1.5 1 1 0 0 0-1 1V14a1 1 0 1 0 2 0v-.5a3.4 3.4 0 0 0 2.5-3.3 3.5 3.5 0 0 0-7-.3 1 1 0 0 0 2 .1c0-.4.2-.7.5-1Zm1 7a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z" clip-rule="evenodd"/>
                      </svg>                
                      <p className='nav-menu-text'>Ask Now</p>
                    </span>            
                </Link>
                <Link to='/experts' className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                    <span className="flex flex-col items-center">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3a2.5 2.5 0 1 1 2-4.5M19.5 17h.5c.6 0 1-.4 1-1a3 3 0 0 0-3-3h-1m0-3a2.5 2.5 0 1 0-2-4.5m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3c0 .6-.4 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                      </svg>              
                      <p className='nav-menu-text'>Experts</p>
                    </span>            
                </Link>                    
            </div>            
          }

          </>
        )}
        {DISPLAY_VERSION && !minimalistic && (
          <span className="version">
            {__COMMIT_HASH__
              ? `v. ${VERSION}-${__COMMIT_HASH__}`
              : `v. ${VERSION}`}
          </span>
        )}
      </div>
      <div className="header-nav header-nav-right">
        {HAS_CHANGE_LANGUAGE && (
          <>
            {!myAccount?.full_name && (
              <button
                type="button"
                className="btn lang d-hidden"
                onClick={toggleLanguageModal}
              >
                <LanguageSvg className="icon icon-lang" />
              </button>
            )}
            <Dropdown
              className="header-dropdown dropdown-lang m-hidden"
              value={language}
              onSelect={handleSelectLanguage}
              options={localeOptions}
              disabled={isOffline}
            >
              <LanguageSvg className="icon icon-lang" />
              <span className="dropdown-label">
                {!minimalistic && selectedLanguageOption?.label}
              </span>              
              <DropdownSvg className="icon icon-dropdown" />
            </Dropdown>
          </>
        )}
        {!minimalistic &&
          myAccount &&
          (myAccount.full_name ? (
            <>
              <button
                type="button"
                // className="btn user d-hidden"
                onClick={toggleMenuSidebarOpen}
              >
                {/* <UserSvg className="icon icon-user" /> */}
                <img className="w-10 h-10 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Rounded avatar" />
                {/* <svg style={{"height":"50px", "width":"50px"}} className="w-[100px] h-[100px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
                </svg> */}

              </button>
              <Dropdown
                className="header-dropdown dropdown-nav m-hidden"
                options={menuOptions}
              >
                <UserSvg className="icon icon-user" />
                <span className="dropdown-label">
                  {!minimalistic && myAccount.full_name}
                </span>                
                <DropdownSvg className="icon icon-dropdown" />
              </Dropdown>
              <MobileSidebar
                position="right"
                open={menuSidebarOpen}
                onClose={toggleMenuSidebarOpen}
              >
                <ul className="header-menu">
                  
                  {menuMobileOptions.map(
                    (option, index) =>
                      !option.hide && (
                        <li
                          key={index}
                          className={cn('menu-item', {
                            'menu-item-divider': option.divider,
                          })}
                        >
                          
                          {option.label &&
                            (option.path ? (
                              <Link
                                className="menu-item-text"
                                to={option.path}
                                onClick={toggleMenuSidebarOpen}
                              >
                                {option.label}
                              </Link>
                            ) : (
                              <span
                                className="menu-item-text"
                                onClick={() => {
                                  toggleMenuSidebarOpen()

                                  if (option.onClick) {
                                    option.onClick()
                                  }
                                }}
                              >
                                {option.label}
                              </span>
                            ))}
                        </li>
                      ),
                  )}
                </ul>
              </MobileSidebar>
            </>
          ) : (
            <button
              type="button"
              className="btn logout"
              onClick={toggleLogoutModal}
            >
              <LogoutSvg className="icon icon-logout" />
              <span className="logout-text">{t('Logout')}</span>
            </button>
          ))}
      </div>
    </header>
  )
}