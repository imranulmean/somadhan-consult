import {
    createUseComponent,
    useActions,
    useForm,
    useLocalGoBack,
  } from '../../hooks'
  
  
  export default createUseComponent(() => {
    const onBack = useLocalGoBack()
    return {
      handlers: {
        onBack,
      },
    }
  })
  