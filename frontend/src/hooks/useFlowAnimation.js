import { useState, useRef } from 'react'

export const useFlowAnimation = (flowSteps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const timeoutRef = useRef(null)

  const startAnimation = () => {
    setIsPlaying(true)
    setIsPaused(false)
    if (currentStep === 0) {
      setCompletedSteps(new Set())
    }
    runStep(currentStep)
  }

  const runStep = (stepIndex) => {
    if (!flowSteps || stepIndex >= flowSteps.length) {
      setIsPlaying(false)
      setIsPaused(false)
      return
    }
    
    setCurrentStep(stepIndex + 1)
    
    timeoutRef.current = setTimeout(() => {
      if (!isPaused) {
        setCompletedSteps(prev => new Set([...prev, stepIndex + 1]))
        runStep(stepIndex + 1)
      }
    }, flowSteps[stepIndex].delay)
  }

  const pauseAnimation = () => {
    setIsPaused(true)
    setIsPlaying(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const resetAnimation = () => {
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentStep(0)
    setCompletedSteps(new Set())
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const goToStep = (stepNumber) => {
    setIsPlaying(false)
    setIsPaused(false)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setCurrentStep(stepNumber)
    const newCompletedSteps = new Set()
    for (let i = 1; i < stepNumber; i++) {
      newCompletedSteps.add(i)
    }
    setCompletedSteps(newCompletedSteps)
  }

  return {
    currentStep,
    isPlaying,
    isPaused,
    completedSteps,
    startAnimation,
    pauseAnimation,
    resetAnimation,
    goToStep
  }
}