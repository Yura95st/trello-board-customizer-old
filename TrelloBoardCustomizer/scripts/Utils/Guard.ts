module Utils
{
    export class Guard
    {
        static notNull(argument: any, argumentName: string): void
        {
            if (argument === undefined)
            {
                throw new RangeError("Argument '" + argumentName + "' is undefined");
            }

            if (argument === null)
            {
                throw new RangeError("Argument '" + argumentName + "' is null");
            }
        }
    }
}