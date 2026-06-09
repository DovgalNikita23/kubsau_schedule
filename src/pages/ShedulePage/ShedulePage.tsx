import { LANG } from '@shared/constants'
import { FullScheduleButton } from '@shared/ui'
import { useGate, useUnit } from 'effector-react'
import { ReactElement, useCallback } from 'react'
import { Schedule, useSnackBar } from '@shared/ui'
import { LangSwitcher } from '@features/LangSwitcher'

import styles from './shedulePage.module.scss'
import { ShedulePageMain } from './ShedulePageMain'
import { ShedulePageHeader } from './ShedulePageHeader'
import { FloatBottomTemplate } from './FloatBottomTemplate'
import {
  $currentWeekDay,
  $failConnect,
  $failConnectInfo,
  $language,
  $scheduleData,
  $successConnectInfo,
  ShedulePageGate,
  langaugeSwitchEvent,
} from './config'

/**
 * Корневой компонент страницы с расписанием
 * @returns {ReactElement}
 */
export const ShedulePage = (): ReactElement => {
  useGate(ShedulePageGate)

  const [
    failConnect,
    failConnectInfo,
    successConnectInfo,
    scheduleData,
    currentWeekDay,
    langaugeSwitch,
    language,
  ] = useUnit([
    $failConnect,
    $failConnectInfo,
    $successConnectInfo,
    $scheduleData,
    $currentWeekDay,
    langaugeSwitchEvent,
    $language,
  ])

  const { SnackBar } = useSnackBar({
    message: failConnectInfo || successConnectInfo,
  })

  const isFullScheduleButtonVisible = !!scheduleData?.length

  const switchHandler = useCallback((lang: LANG) => {
    langaugeSwitch(lang)
  }, [])

  return (
    <div className={styles.shedulePage}>
      <ShedulePageHeader needShowWeekDayCarousel />
      <ShedulePageMain needShowInput>
        <div className={styles.scheduleBlock}>
          <Schedule
            isSingle={true}
            scheduleData={scheduleData}
            currentWeekDay={currentWeekDay}
          />
        </div>
        {isFullScheduleButtonVisible && (
          <div className={styles.fullScheduleButton}>
            <FullScheduleButton />
          </div>
        )}
      </ShedulePageMain>
      <FloatBottomTemplate>
        <LangSwitcher initialValue={language} onSwitchChange={switchHandler} />
      </FloatBottomTemplate>
      {(successConnectInfo || failConnect) && SnackBar}
    </div>
  )
}
