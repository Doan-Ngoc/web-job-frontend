import { Card, Typography, Spinner } from '@material-tailwind/react';

export function FormWrapper({
  title,
  description = '',
  isLoading = false,
  children,
  ...props
}) {
  return (
    <div className="">
      <Card color="transparent" className="w-full h-full bg-green-100 items-center p-12 shadow-2xl">
        {/* {isLoading && (
          <div className="absolute w-full h-full flex justify-center items-center bg-gray-100 opacity-50">
            <Spinner />
          </div>
        )} */}
        <form
          className="mt-8 mb-2 sm:w-96 flex-col justify-evenly gap-2"
          {...props}
        >
          <div className="mb-8">
            <Typography variant="h4" color="blue-gray" className="text-center">
              {title}
            </Typography>
            {description && (
              <Typography color="gray" className="mt-1 font-normal text-center">
                {description}
              </Typography>
            )}
          </div>
          {children}
        </form>
      </Card>
    </div>
  );
}
