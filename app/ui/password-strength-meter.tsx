const PasswordStrengthMeter = ({
  password,
  errors,
}: {
  password: string;
  errors: string[];
}) => {
  const getStrengthColor = (index: number, score: number): string => {
    if (index <= score) {
      switch (score) {
        case 0:
          return 'bg-red-500';
        case 1:
          return 'bg-orange-500';
        case 2:
          return 'bg-yellow-500';
        case 3:
          return 'bg-green-400';
        case 4:
          return 'bg-green-500';
        case 5:
          return 'bg-green-600';
      }
    }
    return 'bg-gray-200';
  };

  const calculateStrength = (pwd: string) => {
    if (pwd.length < 6) return 0;
    if (!/[a-z]/.test(pwd)) return 1;
    if (!/[A-Z]/.test(pwd)) return 2;
    if (!/[0-9]/.test(pwd)) return 3;
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) return 4;
    return 5;
  };

  const strength = calculateStrength(password);

  const renderStrengthBars = (score: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <div
        key={index}
        className={`mx-1 h-2 flex-1 rounded transition-colors duration-500 ${getStrengthColor(index, score)}`}
      />
    ));
  };

  const getPasswordStrengthMessage = (): string => {
    if (password) {
      switch (strength) {
        case 0:
          return 'Too weak';
        case 1:
          return 'Weak';
        case 2:
          return 'Moderate';
        case 3:
          return 'Strong';
        case 4:
          return 'Very strong';
        case 5:
          return 'Excellent';
      }
    } else {
      return '';
    }
  };

  const strengthMessage = getPasswordStrengthMessage();

  return (
    <>
      <div className="mx-auto mt-5 flex w-full max-w-md">
        {password && (
          <>
            <div className="mr-2 flex-1 content-center">
              <div className="flex justify-between">
                {renderStrengthBars(strength)}
              </div>
            </div>
            <p>{strengthMessage}</p>
          </>
        )}
      </div>
      {password && errors.length > 0 && (
        <div className="my-2 flex gap-2">
          <p className="text-sm text-red-500">{errors[0]}</p>
        </div>
      )}
    </>
  );
};

export default PasswordStrengthMeter;
