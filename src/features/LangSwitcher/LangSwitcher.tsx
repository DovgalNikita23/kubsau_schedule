import { Switch } from '@mui/material'
import { LANG } from '@shared/constants'
import RuLangSVG from '@app/assets/svg/RuLang.svg'
import UKLangSVG from '@app/assets/svg/UKLang.svg'
import { ChangeEvent, useCallback, useState } from 'react'

interface ILangSwitcher {
  initialValue: LANG
  onSwitchChange: (value: LANG) => void
}

export const LangSwitcher = ({
  initialValue = LANG.RU,
  onSwitchChange,
}: ILangSwitcher) => {
  const [switchValue, setSwitchValue] = useState<boolean>(
    initialValue === LANG.RU ? false : true
  )
  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked) {
        onSwitchChange(LANG.EN)
      } else {
        onSwitchChange(LANG.RU)
      }

      setSwitchValue(checked)
    },
    []
  )
  return (
    <Switch
      value={switchValue}
      onChange={changeHandler}
      icon={<RuLangSVG fontSize={20} style={{ transform: 'scale(1.5)' }} />}
      checkedIcon={
        <UKLangSVG fontSize={20} style={{ transform: 'scale(1.1)' }} />
      }
    />
  )
}
