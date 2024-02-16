import { Scalar } from '@nestjs/graphql';
import { Kind, ASTNode } from 'graphql';

@Scalar('Date')
export class DateScalar {
    description = 'Date custom scalar type';

    // Serialize date value to send to the client
    parseValue(value: any): Date {
        return new Date(value); // value from the client
    }

    // Parse AST node to validate value before serialization
    parseLiteral(ast: ASTNode): Date | null {
        if (ast.kind === Kind.STRING) {
            return new Date(ast.value); // ast value is always in string format
        }
        return null;
    }

    // Serialize date value to send to the client
    serialize(value: Date): string {
        return value.toISOString(); // value sent to the client
    }
}