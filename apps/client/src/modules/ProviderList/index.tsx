import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import QB, { QBUser } from '@qc/quickblox'

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
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
  const [providers, setProviders1]=useState<any[]>([]);
  const navigate = useNavigate();
  const [expert, setExpert]=  useState<any>({})

  useEffect(()=>{
    var searchParams = {
      tags: "provider", //substring search
      page: 1,
      per_page: 50
    };    
    QB.users.get(searchParams, function(error, result) {
      console.log("Greeting the result:", result);
      if (result && result.items) {
        const providerArray:any[]=result.items;
        for(let i of providerArray){
          i.user["rating"]=5;
        }
        setProviders1(providerArray); 
      }       
    });
  },[])

  const goToProviderProfile = (userId:any) =>{
    navigate(`/providers/${userId}`);
  }

  // const renderProvider = (user: QBUser) => {
    const renderProvider = (user: any) => {
      const dialogName = user.full_name || user.login || user.phone || user.email || t('Unknown')
      const userAvatar = avatarEntries[user.id]
      const custom_data:any= JSON.parse(user?.custom_data);
      user['profilePic']="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
      // get user avatar if blob id not null    
      if(user.blob_id && user.blob_id!==null){
        var blobId = user.blob_id;
        QB.content.getInfo(blobId, function(error, result) {        
            var fileUID:any = result?.blob.uid;                
            var fileUrl = QB.content.privateUrl(fileUID);
            user['profilePic']=fileUrl;
            console.log("Getting The ussr: ",user);
        }) 
        // setExpert(user);           
      }
      return (
        // <li key={user.id} className={cn('provider-item', { active: user.id === selected })} onClick={handleProviderSelectCreator(user.id)}>        
        //   <div className="flex w-full">
        //     <div>
        //       {!userAvatar || userAvatar.loading ? (
        //         <Skeleton variant="circular" className="avatar" />
        //       ) : (
        //         <Avatar blob={userAvatar.blob} className="avatar" />
        //       )}            
        //     </div>
        //     <div className='flex flex-col '>
        //       <span className="provider-name">{dialogName}</span>
        //       <span>{user.custom_data}</span>
        //       <span>Ratings: {user.rating}</span>
        //     </div>
        //     <div className='flex flex-1 justify-end'>
        //       <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        //         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
        //       </svg>
        //     </div>          
        //   </div>
        // </li>
          // <div onClick={handleProviderSelectCreator(user.id)} className="w-full mb-1 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div onClick={()=>goToProviderProfile(user.id)} className="w-full mb-1 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between"> 
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* {!userAvatar || userAvatar.loading ? (
                    <Skeleton variant="circular" className="avatar" />
                  ) : (
                    <Avatar blob={userAvatar.blob} className="avatar" />
                  )} */}
                  <img className="w-8 h-8 rounded-full" src={user.profilePic} alt="Neil image"/>               
                </div>
                <div className="flex flex-col ms-4 justify-between">
                  <p className="text-md font-bold text-gray-900 truncate dark:text-white">
                    {dialogName}
                  </p>
                  <p className="text-sm text-gray-800 truncate dark:text-gray-400">
                    {custom_data?.profession}
                  </p>
                  <p className="text-sm text-gray-600 truncate dark:text-gray-400">
                    {user.email}
                  </p>                           
                </div>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
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
          <FormField htmlFor="search" label={t('FindYourAgent')} className="find-agent-field" hint={t('FindYourAgentHint')} error={searchForm.touched.search && searchForm.errors.search}>
            <TextAreaField id="search" name="search" placeholder={t('TypeYourIssueOrAgent')} disabled={loading} onChange={searchForm.handleChange} onBlur={searchForm.handleBlur} value={searchForm.values.search} rows={7} />
          </FormField>
          <div className="find-agent-controls">
            <Button type="submit" loading={loading}>
              {t('SearchAnAgent')}
            </Button>
            <button type="button" className="find-agent-reset" disabled={loading || isOffline} onClick={handleResetSearch}>
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
            <input onChange={handleChangeSearch} placeholder={t('Search')} type="search" value={search} />
          </div>
        </>
      )}
      {/* <ul className="providers">       */}
      <ul className="p-2">
        {/* {providersWithAssistants.map(renderProvider)} */}
        {providers.map(p=>renderProvider(p.user))}
        {loading && (
          <li>
            <Loader theme="primary" />
          </li>
        )}
      </ul>
    </div>
  )
}
