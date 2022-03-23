import {
  InformationCircleIcon,
} from '@heroicons/react/outline'

export const Navbar = ({
  setIsInfoModalOpen,
}) => {
  return (
    <div className="navbar">
      <div className="navbar-content px-5">
        <InformationCircleIcon
          className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
      </div>
    </div>
  )
}
