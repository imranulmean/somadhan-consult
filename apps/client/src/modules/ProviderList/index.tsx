import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { QBUser } from '@qc/quickblox'

import SearchSvg from '@qc/icons/navigation/search.svg'
import UpdateSvg from '@qc/icons/actions/refresh.svg'
import Avatar from '../../components/Avatar'
import Loader from '../../components/Loader'
import useComponent, { ProviderListProps } from './useComponent'
import { TextAreaField } from '../../components/Field'
import Button from '../../components/Button'
import FormField from '../../components/FormField'
import Skeleton from '../../components/Skeleton'
import './styles.css'

export default function ProviderList(props: ProviderListProps) {
  const { selected } = props
  const {
    forms: { searchForm },
    store: { loading, avatarEntries },
    data: { search, isOffline, providersWithAssistants },
    handlers: {
      handleChangeSearch,
      handleProviderSelectCreator,
      handleResetSearch,
    },
  } = useComponent(props)
  const { t } = useTranslation()

  const renderProvider = (user: QBUser) => {
    const dialogName =
      user.full_name || user.login || user.phone || user.email || t('Unknown')
    const userAvatar = avatarEntries[user.id]

    return (
      <li key={user.id} className={cn('provider-item', { active: user.id === selected })} onClick={handleProviderSelectCreator(user.id)}>
        {!userAvatar || userAvatar.loading ? (
          <Skeleton variant="circular" className="avatar" />
        ) : (
          <Avatar blob={userAvatar.blob} className="avatar" />
        )}
        <div className='flex items-center'>
          <div className='flex flex-col'>
            <span className="provider-name">{dialogName}</span>
            <div className="flex items-center justify-center">
                <svg className="w-3 h-3 text-blue-500 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-3 h-3 text-blue-500 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-3 h-3 text-blue-500 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-3 h-3 text-blue-500 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg className="w-3 h-3 ms-1 text-blue-500 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            </div>            
          </div>
          <div className='flex flex-1'>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
            </svg>
          </div>
        </div>
      </li>
    )
  }

  return (
    <div
      className={cn('provider-list', {
        'provider-list-wide': AI_SUGGEST_PROVIDER,
      })}
    >
      {AI_SUGGEST_PROVIDER ? (
        <form onSubmit={searchForm.handleSubmit}>
          <FormField
            htmlFor="search"
            label={t('FindYourAgent')}
            className="find-agent-field"
            hint={t('FindYourAgentHint')}
            error={searchForm.touched.search && searchForm.errors.search}
          >
            <TextAreaField
              id="search"
              name="search"
              placeholder={t('TypeYourIssueOrAgent')}
              disabled={loading}
              onChange={searchForm.handleChange}
              onBlur={searchForm.handleBlur}
              value={searchForm.values.search}
              rows={7}
            />
          </FormField>
          <div className="find-agent-controls">
            <Button type="submit" loading={loading}>
              {t('SearchAnAgent')}
            </Button>
            <button
              type="button"
              className="find-agent-reset"
              disabled={loading || isOffline}
              onClick={handleResetSearch}
            >
              {loading ? <Loader size={14} theme="primary" /> : <UpdateSvg />}
              <span>{t('RESET')}</span>
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="header-block">
            <span className="title">{t('SelectAnAgent')}</span>
          </div>
          <div className="provider-search">
            <SearchSvg className="icon" />
            <input
              onChange={handleChangeSearch}
              placeholder={t('Search')}
              type="search"
              value={search}
            />
          </div>
        </>
      )}
      <ul className="providers">
        {providersWithAssistants.map(renderProvider)}
        {loading && (
          <li>
            <Loader theme="primary" />
          </li>
        )}
      </ul>
    </div>
  )
}
