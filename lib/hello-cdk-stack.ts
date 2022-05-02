import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import {BucketDeployment, Source} from 'aws-cdk-lib/aws-s3-deployment';
import {Distribution, OriginAccessIdentity, OriginSslPolicy} from "aws-cdk-lib/aws-cloudfront";
import {HttpOrigin, S3Origin} from "aws-cdk-lib/aws-cloudfront-origins";
import { LambdaIntegration, MockIntegration, UsagePlan, AwsIntegration } from 'aws-cdk-lib/aws-apigateway';
// import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from "path";
import { aws_apigateway as apigateway } from 'aws-cdk-lib';

// import * as apigateway from 'aws-cdk-lib/aws-apigatewayv2';


// import * as wafv2 from 'aws-cdk-lib/aws-wafv2'

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cfnApiKey = new apigateway.CfnApiKey(this, 'MyCfnApiKey', /* all optional props */ {
      enabled: true,
      generateDistinctId: true,
      name: 'api-key-demo-websocket',
      // stageKeys: [{
      //   restApiId: 'cjq6use6bj',
      //   stageName: 'production',
      // }],
    });


    const cfnUsagePlan = new apigateway.CfnUsagePlan(this, 'MyCfnUsagePlan', /* all optional props */ {
      apiStages: [{
        apiId: 'cjq6use6bj',
        stage: 'production',
      }],
      description: 'usage plan for websocket ',
      
      tags: [{
        key: 'key',
        value: 'value',
      }],
      throttle: {
        burstLimit: 2,
        rateLimit: 20,
      },
      usagePlanName: 'websocket-demo-usage-plan',
    });

    const cfnUsagePlanKey = new apigateway.CfnUsagePlanKey(this, 'MyCfnUsagePlanKey', {
      keyId: '492ph5flj6',
      keyType: 'API_KEY',
      usagePlanId: '7mybfj',
    });

    // const integration=  apigateway.LambdaIntegration  ;

    // const api = new apigateway.RestApi(this, 'hello-api');

    // const v1 = api.root.addResource('v1');
    // const echo = v1.addResource('echo');
    // const echoMethod = echo.addMethod("GET", integration , { apiKeyRequired: true });

    // const plan = api.addUsagePlan('UsagePlan', {
    //   name: 'Easy',
    //   throttle: {
    //     rateLimit: 10,
    //     burstLimit: 2
    //   }
    // });

    // const key = api.addApiKey('ApiKey');
    // plan.addApiKey(key);

    // const bucket = new s3.Bucket(this, 'MyBucket', {
    //   bucketName: 'ocsd-demo-personal-carts-2',
    // });

    // new BucketDeployment(this, 'BucketDeployment', {
    //   destinationBucket: bucket,
    //   sources: [Source.asset(path.resolve(__dirname, '../dist'))]
    // })


    // const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
    // bucket.grantRead(originAccessIdentity);

    // new Distribution(this, 'Distribution', {
    //   defaultRootObject: 'index.html',
    //   defaultBehavior: {
    //     origin: new S3Origin(bucket, {originAccessIdentity}),
    //   },
    //   additionalBehaviors: {'/api/*':{origin: new HttpOrigin('losrwhslxl.execute-api.ap-southeast-2.amazonaws.com', )}}
      
    // })

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


