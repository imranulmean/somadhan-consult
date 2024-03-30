import { useTranslation } from 'react-i18next'
import cn from 'classnames'
import { QBUser, QBAppointment } from '@qc/quickblox'
import { FULL_DATE_SHORT_FORMAT } from '@qc/template/dateFormat'

import ChevronRightSvg from '@qc/icons/navigation/next.svg'
import { parseUser } from '../../utils/user'
import Avatar from '../Avatar'
import Skeleton from '../Skeleton'
import { localizedFormat } from '../../utils/calendar'
import './styles.css'

interface CardAppointmentProps {
  appointment: QBAppointment
  user?: QBUser
  onClick?: () => void
  className?: string
  showUserInfo?: boolean
  loading?: boolean
  avatar?: {
    loading: boolean
    blob?: Blob | File
    error?: string
  }
}

export default function CardAppointment(props: CardAppointmentProps) {
  const { appointment, user, onClick, className, showUserInfo, loading, avatar, } = props
  const { t } = useTranslation()
  const currentUser = user && parseUser(user)
  const userName = currentUser?.full_name || currentUser?.login || currentUser?.phone || currentUser?.email || t('Unknown')
  console.log("currentUser: ",currentUser);

  return (
    <div className={cn('appointment-card', className)} onClick={onClick}>
      <div className="info">
        {/* <p className="title"> */}
        <p className="text-sm font-semibold">
          {localizedFormat(
            appointment.date_end || appointment.updated_at * 1000,
            FULL_DATE_SHORT_FORMAT,
          )}
        </p>
        {showUserInfo && (
          // <div className="user-info">
          //   {!avatar || avatar.loading ? (
          //     <Skeleton variant="circular" className="avatar" />
          //   ) : (
          //     <Avatar blob={avatar.blob} className="avatar" />
          //   )}
          //   {loading && !currentUser ? (
          //     <Skeleton />
          //   ) : (
          //     <span className="user-name">{userName}</span>
          //   )}
          // </div>
            <div className="w-full flex grid border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">
              
              <figure className="flex items-center justify-center p-1 text-center bg-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
                <div className='flex flex-1 flex-col justify-center items-center'>
                  {!avatar || avatar.loading ? (
                    <Skeleton variant="circular" className="avatar" />
                  ) : (
                    <Avatar blob={avatar.blob} className="avatar" />
                  )} 
                  <figcaption className="flex flex-col items-center justify-center ">
                    <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                      <p className="text-sm font-medium">{userName}</p>
                    </div>
                    <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                     <p className="text-sm font-medium">{currentUser?.custom_data.profession}</p>
                    </div>                    
                  </figcaption>              
                  <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Topic: {appointment.description}</h3>
                  </blockquote>                
                </div>  
                <div className='flex items-center justify-center justify-end'> {/* Added justify-center to align the SVG to the center */}
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
                  </svg>
                </div>                
              </figure>            
            </div>
        )}
        {/* <p className="description">{appointment.description}</p>         */}
      </div>
      {/* <ChevronRightSvg className={cn('icon', { 'icon-top': showUserInfo })} /> */}
    </div>
  )
}
