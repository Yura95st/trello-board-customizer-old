/// <reference path="../References.ts" />
module TrelloBoardCustomizer.Tests.Utils
{
    import Guard = TrelloBoardCustomizer.Utils.Guard;

    QUnit.module("GuardTests");

    QUnit.test("notNull_ArgumentIsNull_ThrowsRangeError",(assert: QUnitAssert) =>
    {
        var argumentName: string = "argumentName";
        var argumentValue: any = null;

        assert.throws(() =>
        {
            Guard.notNull(argumentValue, argumentName);
        }, RangeError);
    });

    QUnit.test("notNull_ArgumentIsNotNull_DoNothing",(assert: QUnitAssert) =>
    {
        var argumentName: string = "argumentName";
        var argumentValue: any = Object;

        Guard.notNull(argumentValue, argumentName);

        assert.ok(true);
    });

    QUnit.test("notNull_ArgumentIsUndefined_ThrowsRangeError",(assert: QUnitAssert) =>
    {
        var argumentName: string = "argumentName";
        var argumentValue: any = undefined;

        assert.throws(() =>
        {
            Guard.notNull(argumentValue, argumentName);
        }, RangeError);
    });

    QUnit.test("notNullOrEmpty_ArgumentIsUndefined_ThrowsRangeError",(assert: QUnitAssert) =>
    {
        var argumentName: string = "argumentName";
        var argumentValue: any = undefined;

        assert.throws(() =>
        {
            Guard.notNullOrEmpty(argumentValue, argumentName);
        }, RangeError);
    });

    QUnit.test("notNullOrEmpty_ArgumentIsNull_ThrowsRangeError",(assert: QUnitAssert) =>
    {
        var argumentName: string = "argumentName";
        var argumentValue: any = null;

        assert.throws(() =>
        {
            Guard.notNullOrEmpty(argumentValue, argumentName);
        }, RangeError);
    });

    QUnit.test("notNullOrEmpty_ArgumentIsEmpty_ThrowsRangeError",(assert: QUnitAssert) =>
    {
        var argumentName: string = "argumentName";
        var argumentValue: any = "";

        assert.throws(() =>
        {
            Guard.notNullOrEmpty(argumentValue, argumentName);
        }, RangeError);
    });

    QUnit.test("notNullOrEmpty_ArgumentIsNotEmpty_DoNothing",(assert: QUnitAssert) =>
    {
        var argumentName: string = "argumentName";
        var argumentValue: any = "argumentValue";

        Guard.notNullOrEmpty(argumentValue, argumentName);

        assert.ok(true);
    });
}