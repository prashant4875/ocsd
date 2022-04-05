import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import {BucketDeployment, Source} from 'aws-cdk-lib/aws-s3-deployment';
import {Distribution, OriginAccessIdentity, OriginSslPolicy} from "aws-cdk-lib/aws-cloudfront";
import {HttpOrigin, S3Origin} from "aws-cdk-lib/aws-cloudfront-origins";
import * as path from "path";
// import * as apigateway from 'aws-cdk-lib/aws-apigatewayv2';


// import * as wafv2 from 'aws-cdk-lib/aws-wafv2'

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps,) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'MyBucket', {
      bucketName: 'ocsd-demo-personal-carts-2',
    });

    new BucketDeployment(this, 'BucketDeployment', {
      destinationBucket: bucket,
      sources: [Source.asset(path.resolve(__dirname, '../dist'))]
    })


    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
    bucket.grantRead(originAccessIdentity);

    new Distribution(this, 'Distribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(bucket, {originAccessIdentity}),
      },
      additionalBehaviors: {'/api/*':{origin: new HttpOrigin('losrwhslxl.execute-api.ap-southeast-2.amazonaws.com', )}}
      
    })

    // const cfnIPSet = new wafv2.CfnIPSet(this, 'MyCfnIPSet', {
    //   addresses: ['10.0.0.0/32'],
    //   ipAddressVersion: 'IPV4',
    //   scope: 'REGIONAL' ,
    //   description: 'ocsd-demo',
    //   name: 'ocsd-ipsets'
    // });

    // const cfnWebACL = new wafv2.CfnWebACL(this, 'MyCfnWebACL', {
    //   description: 'description',
    //   name: 'name'
    // });
      

    

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'HelloCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
