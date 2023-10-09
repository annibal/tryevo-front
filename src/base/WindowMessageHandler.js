import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WindowMessageHandler = () => {
  const nav = useNavigate()

  useEffect(() => {

    function handleWindowMessage(evt) {
      if (evt?.data?.action != null) {
        const action = evt.data.action;
        const data = evt.data.payload;

        console.log('Handle Window Message', { action, data })

        if (action === "navigate") {
          nav(data.to, data.options)
        }
      }
    }

    window.addEventListener("message", handleWindowMessage)

    return () => {
      window.removeEventListener("message", handleWindowMessage)
    }
  }, [])


  return '';
}

export default WindowMessageHandler