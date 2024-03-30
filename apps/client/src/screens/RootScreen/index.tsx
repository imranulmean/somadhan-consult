import { Routes, Route, Navigate } from 'react-router-dom'

import {
  PROFILE_ROUTE,
  APPOINTMENT_ROUTE,
  PROVIDERS_ROUTE,
  HISTORY_ROUTE,
  APPOINTMENT_FINISH_ROUTE,
  PROVIDER_ROUTE,
  GUEST_APPOINTMENT_ROUTE,
  EXPERTS_ROUTE,
  HOME_ROUTE,
  ASKNOW_ROUTE
  
} from '../../constants/routes'

import Modal from '../../components/Modal'

import Header from '../../modules/Header'
import Notifications from '../../modules/Notification'
import VideoCall from '../../modules/VideoCall'
import AppointmentDetailsModal from '../../modules/modals/AppointmentDetailsModal'
import LogoutModal from '../../modules/modals/LogoutModal'
import LeaveQueueModal from '../../modules/modals/LeaveQueueModal'
import CallModal from '../../modules/modals/CallModal'
import ConsultationTopicModal from '../../modules/modals/ConsultationTopicModal'
import ProviderBiographyModal from '../../modules/modals/ProviderBiographyModal'

import AppointmentScreen from '../AppointmentScreen'
import AppointmentFinishScreen from '../AppointmentFinishScreen'
import ProvidersScreen from '../ProvidersScreen'
import ProfileScreen from '../ProfileScreen'
import HistoryScreen from '../HistoryScreen'
import ExpertsScreen from '../ExpertsScreen'
import HomeScreen from '../HomeScreen'
import AskNowScreen from '../AskNowScreen'

import useComponent from './useComponent'
import './styles.css'
import ExpertsProfileScreen from '../ExpertsProfileScreen'

export default function RootScreen() {
  const {
    data: { location, height, appointmentRouteMatch, isGuestAccess },
  } = useComponent()

  const renderContent = () => {
    if (isGuestAccess) {
      return (
        <Routes>
          <Route
            path={APPOINTMENT_FINISH_ROUTE}
            element={<AppointmentFinishScreen />}
          />
          <Route path={APPOINTMENT_ROUTE} element={<AppointmentScreen />} />
          <Route
            path={GUEST_APPOINTMENT_ROUTE}
            element={<AppointmentScreen />}
          />
          <Route
            path="*"
            element={
              <Navigate
                to={location.state?.referrer || GUEST_APPOINTMENT_ROUTE}
                replace
              />
            }
          />
        </Routes>
      )
    }

    return (
      <Routes>
        <Route path={HOME_ROUTE} element={<HomeScreen />} />
        <Route path={ASKNOW_ROUTE} element={<AskNowScreen />} />
        <Route path={PROFILE_ROUTE} element={<ProfileScreen />} />
        <Route path={APPOINTMENT_ROUTE} element={<AppointmentScreen />} />
        {HAS_HISTORY && (
          <Route path={HISTORY_ROUTE} element={<HistoryScreen />} />
        )}        
        <Route path={PROVIDERS_ROUTE} element={<ExpertsScreen />} />
        <Route path={PROVIDER_ROUTE} element={<ProvidersScreen />} />
        <Route path={EXPERTS_ROUTE} element={<ExpertsScreen />} />
        <Route path="/experts/:expertId" element={<ExpertsProfileScreen />} />
        <Route path="/inbox" element={<HistoryScreen />} />
        <Route
          path="*"
          element={
            <Navigate
              to={location.state?.referrer || EXPERTS_ROUTE}
              replace
            />
          }
        />
      </Routes>
    )
  }

  return (
    <main
      className="main-screen"
      style={appointmentRouteMatch ? { height: `${height}px` } : undefined}
    >
      <VideoCall />
      <div className="screen-wrapper">
        <Header />
        {renderContent()}
      </div>
      <Modal>
        <LeaveQueueModal />
        <CallModal />
        <ConsultationTopicModal />
        <AppointmentDetailsModal />
        <ProviderBiographyModal />
        <Notifications />
        <LogoutModal />
      </Modal>
    </main>
  )
}
