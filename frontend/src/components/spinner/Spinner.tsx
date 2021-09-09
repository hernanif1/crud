interface Spinner {
  size?: 'lg' | 'sm'
}
const Spinner = ({ size = 'lg' }: Spinner) => (
  <div className="d-flex justify-content-center">
    <div className={`spinner-border spinner-border-${size}`} />
  </div>
)

export { Spinner }
