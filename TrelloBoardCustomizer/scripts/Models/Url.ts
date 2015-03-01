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

        get hostname(): string
        {
            return this._hostname;
        }

        get originalString(): string
        {
            return this._originalString;
        }

        get protocol(): string
        {
            return this._protocol;
        }

        get segments(): string[]
        {
            return this._segments;
        }

        private parse(): void
        {
            var anchorElement: HTMLAnchorElement = document.createElement("a");

            anchorElement.href = this._originalString;

            this._hostname = anchorElement.hostname;
            this._protocol = anchorElement.protocol;

            var segments: string[] = anchorElement.pathname.split("/");

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