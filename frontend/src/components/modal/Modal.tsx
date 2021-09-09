import { Spinner } from 'components'
import { useEffect } from 'react'

interface Modal {
  title?: string
  children?: JSX.Element | JSX.Element[]
  onConfirm: () => void
  onClose: () => void
  isSubmitting?: boolean
  isSubmitSuccess?: boolean
  error?: boolean
  confirmLabel?: string
  deleteAction?: boolean
}

const Modal = ({
  title,
  children,
  onConfirm,
  onClose,
  isSubmitting,
  isSubmitSuccess,
  error,
  confirmLabel,
  deleteAction
}: Modal) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      return event.key === 'Escape' && !isSubmitting && onClose()
    }

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    isSubmitSuccess && onClose()
  }, [isSubmitSuccess])

  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
                disabled={isSubmitting}
              />
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              {error && (
                <div className="col-auto text-danger">Error message</div>
              )}
              <button
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn ${deleteAction ? 'btn-danger' : 'btn-success'}`}
                onClick={onConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting && <Spinner size="sm" />}
                {!isSubmitting && confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}

export { Modal }
