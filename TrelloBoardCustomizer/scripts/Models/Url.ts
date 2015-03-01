/// <reference path="../References.ts" />
module Models
{
    import Guard = Utils.Guard;

    export class Url
    {
        private _hostname: string;
        private _originalString: string;
        private _protocol: string;
        private _segments: string[];

        constructor(urlString: string)
        {
            Guard.notNullOrEmpty(urlString, "urlString");

            this._originalString = urlString;

            this._segments = [];

            this.parse();
        }

        get protocol(): string
        {
            return this._protocol;
        }

        get hostname(): string
        {
            return this._hostname;
        }

        get originalString(): string
        {
            return this._originalString;
        }

        get segments(): string[]
        {
            return this._segments;
        }

        private parse(): void
        {
            var parser: HTMLAnchorElement = document.createElement("a");

            parser.href = this._originalString;

            this._hostname = parser.hostname;
            this._protocol = parser.protocol;

            var segments: string[] = parser.pathname.split("/");

            segments.forEach((segment: string) =>
            {
                if (segment !== "")
                {
                    this._segments.push(segment);
                }
            });
        }
    }
}