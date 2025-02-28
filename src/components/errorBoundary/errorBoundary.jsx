import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props)
   
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false, error: undefined }
    }
    static getDerivedStateFromError(error) {
        console.log('Caught Error', error)
      // Update state so the next render will show the fallback UI
      return { hasError: true, error }
    }
    componentDidCatch(error, errorInfo) {
      // You can use your own error logging service here
      console.log('Error Info', { error, errorInfo })
    }

    componentDidUpdate(prevProps) {
        // Reset error state if resetProp has changed
        if (prevProps.resets !== this.props.resets && this.state.hasError) {
            this.setState({ hasError: false, error: null });
        }
    }

    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div className='w-full h-full flex flex-col bg-orange-200 rounded-md gap-2 p-4'>
            <div className='w-full flex items-center gap-2'>
                <ExclamationTriangleIcon />
                <h2>Oops, there is an error with your code!</h2>
            </div>
            <div className='w-full h-fit p-4 bg-[#FF5555] text-white rounded-sm font-medium'>
                <h4>Error: {this.state.error.message}</h4>
            </div>
            <button
              type="button"
              className='w-fit'
              onClick={() => this.setState({ hasError: false })}
            >
              Try again?
            </button>
          </div>
        )
      }
   
      // Return children components in case of no error
      return this.props.children
    }
  }
   
  export default ErrorBoundary