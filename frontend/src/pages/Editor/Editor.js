import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth, useActions, useEvent } from '/src/hooks'
import { useToolStore, useProjectStore } from '/src/stores'
import { haveInputFocused } from '/src/util/actions'
import { Menubar, Sidepanel, Toolbar, EditorPanel, Spinner } from '/src/components'
import { getProject } from '/src/services/project'

import { Content, LoadingContainer } from './editorStyle'

const Editor = () => {
  const { user, loading: userLoading } = useAuth()
  const navigate = useNavigate()
  const { tool, setTool } = useToolStore()
  const [priorTool, setPriorTool] = useState()
  const [loading, setLoading] = useState(true)

  // Register action hotkey
  useActions(true)

  // Project must be set
  useEffect(() => {
    if (!useProjectStore.getState().project) {
      navigate('/new')
    }
  }, [])

  // Ensure project is syncronised with the backend before showing editor page
  // This prevents situation where user updates local copy of project before its overriden by backend sync
  useEffect(() => {
    if (!userLoading) {
      if (!user) {
        // If not logged in, just show what is stored
        setLoading(false)
      } else {
        // If logged in, attempt to update stored project from backend before showing it
        const projectStore = useProjectStore.getState()
        const { project: currentProject, set: setProject } = projectStore
        getProject(currentProject._id)
          .then(({ project }) => project && setProject(project))
          .then(() => setLoading(false))
          .catch(e => { console.warn(e); setLoading(false) })
      }
    }
  }, [user, userLoading])

  // Change tool when holding certain keys
  useEvent('keydown', e => {
    // Hotkeys are disabled if an input is focused
    if (haveInputFocused(e)) return

    if (!priorTool && e.code === 'Space') {
      setPriorTool(tool)
      setTool('hand')
    }
    if (e.code === 'Space') {
      e.preventDefault()
      e.stopPropagation()
    }
  }, [tool, priorTool])

  useEvent('keyup', e => {
    // Hotkeys are disabled if an input is focused
    if (haveInputFocused(e)) return

    if (priorTool && e.code === 'Space') {
      setTool(priorTool)
      setPriorTool(undefined)
    }
    if (e.code === 'Space') {
      e.preventDefault()
      e.stopPropagation()
    }
  }, [tool, priorTool])

  if (loading) return <LoadingContainer>
    <Spinner />
  </LoadingContainer>

  return (
    <>
      <Menubar />
      <Content>
        <Toolbar />
        <EditorPanel />
        <Sidepanel />
      </Content>
    </>
  )
}

export default Editor
