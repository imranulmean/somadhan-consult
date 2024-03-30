import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import localeOptions from '@qc/template/locales'

import { updateMyAccount, toggleShowModal } from '../../actionCreators'
import { PROFILE_ROUTE, HISTORY_ROUTE, EXPERTS_ROUTE } from '../../constants/routes'
import { createUseComponent, useActions } from '../../hooks'
import { authMyAccountSelector } from '../../selectors'
import { createMapStateSelector } from '../../utils/selectors'
import useIsOffLine from '../../hooks/useIsOffLine'
import { currentUserIsGuest } from '../../utils/user'

const selector = createMapStateSelector({
  myAccount: authMyAccountSelector,
})

export default createUseComponent(() => {
  const store = useSelector(selector)
  const actions = useActions({
    updateMyAccount,
    toggleShowModal,
  })
  const isOffline = useIsOffLine()
  const { myAccount } = store

  const { t, i18n } = useTranslation()
  const [menuSidebarOpen, setMenuSidebarOpen] = useState(false)
  const [language, setLanguage] = useState(i18n.language)

  const selectedLanguageOption = localeOptions.find(
    ({ value }) => language === value,
  )
  const isGuest = myAccount && currentUserIsGuest(myAccount)
  const isGuestAccess = isGuest && ENABLE_GUEST_CLIENT

  const toggleMenuSidebarOpen = () => setMenuSidebarOpen(!menuSidebarOpen)
  const toggleLanguageModal = () =>
    actions.toggleShowModal({ modal: 'LanguageModal' })
  const toggleLogoutModal = () =>
    actions.toggleShowModal({ modal: 'LogoutModal' })

  const handleSelectLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setLanguage(lang)

    if (myAccount) {
      const userData = {
        language: lang,
      }

      actions.updateMyAccount(userData)
    }
  }

  const menuOptions = [
    {
      label: t('History'),
      path: HISTORY_ROUTE,
      hide: !HAS_HISTORY || isGuestAccess,
    },
    {
      label: t('Test'),
      path: HISTORY_ROUTE,
      hide: !HAS_HISTORY || isGuestAccess,
    },
    {
      label: t('Profile'),
      path: PROFILE_ROUTE,
      hide: isGuestAccess,
    },
    { divider: !isGuestAccess },
    { label: t('Logout'), onClick: toggleLogoutModal },
  ]

  const menuMobileOptions = [
    // {
    //   label: t('History'),
    //   path: HISTORY_ROUTE,
    //   hide: !HAS_HISTORY || isGuestAccess,
    // },
    { label: t('Profile'), path: PROFILE_ROUTE, hide: isGuestAccess },
    // { label: t('Language'), onClick: toggleLanguageModal },
    // { label: t('Experts'), path: EXPERTS_ROUTE},
    { divider: !isGuestAccess },
    { label: t('Logout'), onClick: toggleLogoutModal },
  ]

  useEffect(() => {
    setLanguage(i18n.language)
  }, [i18n.language])

  return {
    store,
    actions,
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
  }
})
